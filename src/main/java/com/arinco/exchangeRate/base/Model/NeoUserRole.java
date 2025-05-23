package com.arinco.exchangeRate.base.Model;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * @author Josué Moreno (Ar.In.Co. - Desarrollo de Software)
 * @version 1.0 Date Creation: 14 ago 2023
 * 
 */
@Entity
@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "neo_user_role")
public class NeoUserRole implements IModel {

	private static final long serialVersionUID = 1L; 
	
	@Id
	@Basic(optional = false)
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	
	private Integer userId; 
	private Integer roleId;
}
