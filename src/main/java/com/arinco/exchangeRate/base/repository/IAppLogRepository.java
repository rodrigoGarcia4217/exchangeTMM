package com.arinco.exchangeRate.base.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.arinco.exchangeRate.base.Model.AppLog;

@Repository("appLogRepository")
public interface IAppLogRepository extends JpaRepository<AppLog, String>{

}
