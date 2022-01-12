package com.ssafy.db.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.db.entity.Test2;

@Repository
public interface TestRepository extends JpaRepository<Test2, Long>{
    Optional<Test2> findByNameAndEmail(String name, String email);
    //네이밍에 따라 sql 쿼리문 만들어준다.
    //qrdsl 사용하면 내가 커스텀해서 쿼리문 만들기 가능.
    
//    @Query("select * from test2")
//    Optional<Test2> find11();
//    
    
}
