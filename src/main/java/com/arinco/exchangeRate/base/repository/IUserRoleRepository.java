package com.arinco.exchangeRate.base.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.arinco.exchangeRate.base.Model.NeoUserRole;

@Repository("userRoleRepository")
public interface IUserRoleRepository extends JpaRepository<NeoUserRole,Integer>{

    /**
	 * @param userId
	 * @param roleId
	 * @return
	 */
	NeoUserRole findByUserIdAndRoleId(Integer userId, Integer roleId);

	/**
	 * @param userId
	 * @param roleId
	 * @return
	 */
	Long deleteByUserIdAndRoleId(Integer userId, Integer roleId);

	/**
	 * @param userId
	 * @return
	 */
	List<NeoUserRole> findByUserId(Integer userId);
}

