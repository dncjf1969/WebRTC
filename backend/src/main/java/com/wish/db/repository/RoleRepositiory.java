package com.wish.db.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.wish.db.entity.Member;
import com.wish.db.entity.Role;

@Repository
public interface RoleRepositiory extends JpaRepository<Role, Long> {
	
	Optional<List<Role>> findByMemberId(String memberId);
	Optional<Role> findByMemberIdAndRole(String memberId, String role);
    
	
	
//	Optional<Member> findByEmail(String id);
//	
//	boolean existsById(String id);
//	boolean existsByName(String name);
//	
//    //jpql
//    @Query(value = "select * from member where id = ?1 and name = ?2", nativeQuery = true)
//    Optional<Member> find2(String id, String name);
}
