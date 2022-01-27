package com.wish.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket restAPI() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.wish"))
                .paths(PathSelectors.any())
                .build();
    }
    
    private static final String TITLE = "WISH REST API";
    private static final String VERSION = "1.0.0";
    private static final String DESCRIPTION = "wish에서 제공하는 API를 확인해 볼 수 있습니다.";
    
    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title(TITLE)
                .version(VERSION)
                .description(DESCRIPTION )
                .build();
    }
}
