package com.arinco.exchangeRate.base.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.arinco.exchangeRate.base.Model.NeoUsers;
import com.arinco.exchangeRate.base.repository.IRolesRepository;
import com.arinco.exchangeRate.base.repository.IUsersRepository;
import com.arinco.exchangeRate.base.utils.ConstManagement;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserDetailService implements UserDetailsService{

	@Autowired
	private IUsersRepository userRepository;
	
	@Autowired
	private IRolesRepository roleRepository;
   
	@Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("Username selected: {}", username);
		NeoUsers user = userRepository.findByUserNameAndActive(username, ConstManagement.ACTIVE);
		
		if (user == null) {
			throw new UsernameNotFoundException(username);
		}
		
		List<String> roles = roleRepository.getRoleList(user.getUserId());
		List<GrantedAuthority> grantList = new ArrayList<GrantedAuthority>();
		
		roles.forEach(role -> {
			log.info("Rol: [{}]", role);
			GrantedAuthority authority = new SimpleGrantedAuthority(role);
			grantList.add(authority);
		});
		
		return (UserDetails) new User(
				user.getUserName(), 
				user.getEncrytedPassword(),
				grantList);
    }

}
