package com.arinco.exchangeRate.base.service.core;

import java.util.List;

import com.arinco.exchangeRate.base.dto.UserManagementDto;
import com.arinco.exchangeRate.base.dto.UserRoleDto;
import com.arinco.exchangeRate.base.dto.UsersDto;
import com.arinco.exchangeRate.base.exception.ConverterException;
import com.arinco.exchangeRate.base.utils.ComboBox;
import com.arinco.exchangeRate.base.utils.ResponseManagement;

public interface IUserManagementService {
    /**
	 * @return
	 */
	List<UserManagementDto> findAll() throws ConverterException;

	/**
	 * @param userName
	 * @return
	 */
	Integer getUserId(String userName);

	/**
	 * @param userName
	 * @return
	 */
	Boolean getChangePassword(String userName);

	/**
	 * @param usersDto
	 * @return
	 */
	ResponseManagement updatePassword(UsersDto usersDto);

	/**
	 * @param email
	 * @return
	 */
	ResponseManagement resetPassword(String email);

	/**
	 * @param userRoleDto
	 * @return
	 */
	ResponseManagement updateRole(UserRoleDto userRoleDto);

	/**
	 * @param userId
	 * @return
	 */
	List<ComboBox> findByUserId(Integer userId);

	/**
	 * @param userId
	 * @return
	 */
	ResponseManagement changeActive(Integer userId);

	/**
	 * @param createUserDto
	 * @return
	 */
	ResponseManagement createUser(UsersDto usersDto);


}
