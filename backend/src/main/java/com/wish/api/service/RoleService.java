package com.wish.api.service;

import java.util.List;

import com.wish.db.entity.Role;

public interface RoleService {
	
	public void createRole(String memberId, String role);
	public List<Role> readRole(String memberId);
	public void updateRole(String memberId, String role);
	public void deleteRole(String memberId, String role);
}
