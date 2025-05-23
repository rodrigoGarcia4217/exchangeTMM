package com.arinco.exchangeRate.base.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.arinco.exchangeRate.base.Model.NeoRoles;
import com.arinco.exchangeRate.base.Model.NeoUserRole;
import com.arinco.exchangeRate.base.Model.NeoUsers;
import com.arinco.exchangeRate.base.dto.UserManagementDto;
import com.arinco.exchangeRate.base.dto.UserRoleDto;
import com.arinco.exchangeRate.base.dto.UsersDto;
import com.arinco.exchangeRate.base.exception.ConverterException;
import com.arinco.exchangeRate.base.repository.IRolesRepository;
import com.arinco.exchangeRate.base.repository.IUserRoleRepository;
import com.arinco.exchangeRate.base.repository.IUsersRepository;
import com.arinco.exchangeRate.base.service.core.IUserManagementService;
import com.arinco.exchangeRate.base.utils.ComboBox;
import com.arinco.exchangeRate.base.utils.ConstManagement;
import com.arinco.exchangeRate.base.utils.EncrytedPasswordUtils;
import com.arinco.exchangeRate.base.utils.LogManagement;
import com.arinco.exchangeRate.base.utils.ResponseManagement;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Transactional
@Service("userManagementService")
public class UserManagementService implements IUserManagementService {
	
	@Autowired
	private IUsersRepository usersRepository;
	
	@Autowired
	private IRolesRepository rolesRepository;
	
	@Autowired
	private IUserRoleRepository userRoleRepository;
	
	

    @Override
	public List<UserManagementDto> findAll() throws ConverterException {
		List<UserManagementDto> list = new ArrayList<UserManagementDto>();
		List<NeoUsers> allUsers = usersRepository.findAll();
		for(NeoUsers user : allUsers) {
			UserManagementDto element = UserManagementDto.builder()
					.userId(user.getUserId())
					.userName(user.getUserName())
					.userRoles(rolesRepository.getRoleList(user.getUserId()))			
					.active(user.getActive())
					.build();
			list.add(element);
		}
		return list;
	}

	@Override
	public Integer getUserId(String userName) {
		NeoUsers appUser = usersRepository.findByUserName(userName);
		if(appUser == null) {
			return ConstManagement.ANONYMUS_ID; 
		} else {
			return appUser.getUserId();
		}
	}

	@Override
	public Boolean getChangePassword(String userName) {
		NeoUsers appUser = usersRepository.findByUserName(userName);
		if(appUser == null) {
			return ConstManagement.FALSE; 
		} else {
			return appUser.getChangePassword();
		}
	}

	@Override
	public ResponseManagement updatePassword(UsersDto usersDto) {
		ResponseManagement response = ResponseManagement.builder().success(ConstManagement.FALSE).operation(usersDto.getOperation()).build();
		try {
			NeoUsers appUser = usersRepository.findByUserId(usersDto.getIdUser());
			appUser.setEncrytedPassword(EncrytedPasswordUtils.encrytePassword(usersDto.getEncrytedPassword()));
			appUser.setActive(true);
			appUser.setChangePassword(false);
			response.setSuccess(ConstManagement.TRUE);
			return response;
		} catch(Exception ex) {
			log.error(ex.toString());
			response.setErrorCode(LogManagement.CONTROLLER_CODE);
			response.setMessage(LogManagement.CONTROLLER_ERROR + ex.toString());
			response.setSuccess(ConstManagement.FALSE);
			return response;
		}
	}


	@Override
	public ResponseManagement updateRole(UserRoleDto userRoleDto) {
		ResponseManagement response = ResponseManagement.builder().operation(userRoleDto.getOperation()).success(ConstManagement.FALSE).build();
		try {
			switch(userRoleDto.getOperation()) {
			case ConstManagement.INSERT:
				NeoUserRole newUserRole = NeoUserRole.builder()
					.userId(userRoleDto.getUserId())
					.roleId(userRoleDto.getRoleId())
					.build();
				
				userRoleRepository.save(newUserRole);
				response.setSuccess(ConstManagement.TRUE);
				break;
			case ConstManagement.DELETE:
				Long deletedRecords = userRoleRepository.deleteByUserIdAndRoleId(userRoleDto.getUserId(), userRoleDto.getRoleId());
				log.info("Deleted Records = " + deletedRecords.toString());
				response.setSuccess(true);
				break;
			}
		} catch(Exception ex) {
			log.error(ex.toString());
			response.setErrorCode(LogManagement.CONTROLLER_CODE);
			response.setMessage(LogManagement.CONTROLLER_ERROR + ex.toString());
			response.setSuccess(ConstManagement.FALSE);
		}
		return response;
	}

	@Override
	public List<ComboBox> findByUserId(Integer userId) {
		List<ComboBox> list = new ArrayList<ComboBox>();
		List<NeoUserRole> userRoles = userRoleRepository.findByUserId(userId);
		list.add(ComboBox.builder().id(ConstManagement.NO_ID).description(ConstManagement.NO_OPTION).build());
		for(NeoUserRole element : userRoles) {
			NeoRoles role = rolesRepository.findByRoleId(element.getRoleId());
			list.add(ComboBox.builder()
					.id(role.getRoleId())
					.description(role.getRoleName())
					.build());
		}
		return list;
	}

	@Override
	public ResponseManagement changeActive(Integer userId) {
		ResponseManagement response = ResponseManagement.builder().operation(ConstManagement.UPDATE).success(ConstManagement.FALSE).build();
		try {
			NeoUsers user = usersRepository.findByUserId(userId);
			if(user.getActive().equals(ConstManagement.TRUE)) {
				user.setActive(ConstManagement.FALSE);
			} else {
				user.setActive(ConstManagement.TRUE);
			}
			response.setSuccess(ConstManagement.TRUE);
		} catch(Exception ex) {
			log.error(ex.toString());
			response.setErrorCode(LogManagement.CONTROLLER_CODE);
			response.setMessage(LogManagement.CONTROLLER_ERROR + ex.toString());
			response.setSuccess(ConstManagement.FALSE);
		}
		return response;
	}

	@Override
	public ResponseManagement createUser(UsersDto usersDto) {
		ResponseManagement response = ResponseManagement.builder().operation(usersDto.getOperation()).success(ConstManagement.FALSE).build();
		try {
			String newPassword = RandomStringUtils.randomAscii(8);
			NeoUsers userEntity = NeoUsers.builder()
					//.userName(usersDto.getLastName().substring(0,1).toUpperCase() + usersDto.getSurName().substring(0,1).toUpperCase() + usersDto.getFirstName().substring(0,2).toUpperCase() + usersDto.getBday().substring(5).replace("-", ""))
					.encrytedPassword(EncrytedPasswordUtils.encrytePassword(newPassword))
					.changePassword(ConstManagement.TRUE)
					.active(ConstManagement.TRUE)
					.build();
			
			usersRepository.save(userEntity);
			
			NeoUsers entity = usersRepository.findByUserName(userEntity.getUserName());
			
			NeoUserRole userRoleEntity = NeoUserRole.builder()
					.userId(entity.getUserId())
					//.roleId(usersDto.getRole())
					.build();
			
			userRoleRepository.save(userRoleEntity);
			
			response.setSuccess(ConstManagement.TRUE);
			
			
		} catch(Exception ex) {
			log.error(ex.toString());
			response.setErrorCode(LogManagement.CONTROLLER_CODE);
			response.setMessage(LogManagement.CONTROLLER_ERROR + ex.toString());
			response.setSuccess(ConstManagement.FALSE);
		}
		return response;
	}

	@Override
	public ResponseManagement resetPassword(String email) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'resetPassword'");
	}

}


