package com.arinco.exchangeRate.base.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;

import com.arinco.exchangeRate.base.Model.NeoRoles;

@Component("rolesRepository")
public interface IRolesRepository extends JpaRepository<NeoRoles, Integer> {

    /**
	 * @param userId
	 * @return
	 */
	@Query(value = "SELECT r.roleName FROM neo_user_role ur, neo_roles r WHERE ur.roleId = r.roleId AND ur.userId = :userId", nativeQuery = true)
	List<String> getRoleList(@Param("userId") Integer userId);
    
	/**
	 * @param roleId
	 * @return
	 */
	NeoRoles findByRoleId(Integer roleId);

}
