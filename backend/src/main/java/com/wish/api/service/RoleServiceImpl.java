package com.wish.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wish.db.entity.Role;
import com.wish.db.repository.RoleRepositiory;

@Service
public class RoleServiceImpl implements RoleService{

	@Autowired
	RoleRepositiory roleRepositiory;
 	
	@Override
	public void createRole(String memberId, String role) {
		
		Role roleOb = new Role();
		roleOb.setMemberId(memberId);
		roleOb.setRole(role);

		roleRepositiory.save(roleOb);
	}

	@Override
	public List<Role> readRole(String memberId) {
		// TODO Auto-generated method stub
		
		List<Role> list = roleRepositiory.findByMemberId(memberId).get();
		
		return list;
	}

	@Override
	public void updateRole(String memberId, String role) {
		// TODO Auto-generated method stub
		
		Role roleOb = roleRepositiory.findByMemberIdAndRole(memberId, role).get();
		roleOb.setMemberId(memberId);
		roleOb.setRole(role);
		
		roleRepositiory.save(roleOb);
	}

	@Override
	public void deleteRole(String memberId, String role) {
		// TODO Auto-generated method stub
		
		Role roleOb = roleRepositiory.findByMemberIdAndRole(memberId, role).get();
		
		roleRepositiory.delete(roleOb);
	}

}