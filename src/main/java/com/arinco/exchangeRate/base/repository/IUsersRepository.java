package com.arinco.exchangeRate.base.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.arinco.exchangeRate.base.Model.NeoUsers;

@Repository
public interface IUsersRepository extends JpaRepository<NeoUsers, Integer>{

    /**
	 * @param username
	 * @param active
	 * @return
	 */
	NeoUsers findByUserNameAndActive(String username, Boolean active);

	/**
	 * @param userName
	 * @return
	 */
	NeoUsers findByUserName(String userName);

	/**
	 * @param idUser
	 * @return
	 */
	NeoUsers findByUserId(Integer idUser);

}
