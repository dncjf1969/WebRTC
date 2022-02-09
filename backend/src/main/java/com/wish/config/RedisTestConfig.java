package com.wish.config;

import com.wish.api.dto.Room;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.JdkSerializationRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

        @Configuration
        public class RedisTestConfig {
            @Value("${spring.redis.host}")
            private String redisHost;
            @Value("${spring.redis.port}")
            private String redisPort;
            //@Value("${spring.redis.password}")
            //private String redisPassword;

            @Bean
            public RedisConnectionFactory redisConnectionFactory() {
                RedisStandaloneConfiguration redisStandaloneConfiguration = new RedisStandaloneConfiguration();
                redisStandaloneConfiguration.setHostName(redisHost);
                redisStandaloneConfiguration.setPort(Integer.parseInt(redisPort));
                //redisStandaloneConfiguration.setPassword(redisPassword);
                LettuceConnectionFactory lettuceConnectionFactory = new LettuceConnectionFactory(redisStandaloneConfiguration);
            return lettuceConnectionFactory;
            }
            
            @Bean
            public RedisTemplate<String, Room> redisTemplate() {
                RedisTemplate<String, Room> redisTemplate = new RedisTemplate<>();
                redisTemplate.setConnectionFactory(redisConnectionFactory());
                redisTemplate.setKeySerializer(new StringRedisSerializer());
                redisTemplate.setValueSerializer(new GenericJackson2JsonRedisSerializer());
            return redisTemplate;
            }
}

