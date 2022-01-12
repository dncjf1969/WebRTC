package com.ssafy.db.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.db.entity.Test2;

@Repository
public interface TestRepository extends JpaRepository<Test2, Long>{
	Optional<Test2> findByTestName(String name);
}
