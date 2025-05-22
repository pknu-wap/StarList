package wap.starlist.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.security.SecurityScheme.Type;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    private static final String SECURITY_SCHEME_NAME = "bearerAuth";

    @Bean
    public OpenAPI getOpenApi() {
        return new OpenAPI()
                .components(new Components()
                        .addSecuritySchemes(SECURITY_SCHEME_NAME, createBearerScheme()))
                .addSecurityItem(new SecurityRequirement().addList(SECURITY_SCHEME_NAME))
                .info(getInfo());
    }

    private Info getInfo() {
        return new Info()
                .title("Starlist")
                .description("Starlist API 문서")
                .version("0.0.1");
    }

    private SecurityScheme createBearerScheme() {
        return new SecurityScheme()
                .name("Authorization")
                .type(Type.HTTP)
                .scheme("bearer")
                .bearerFormat("JWT");
    }
}
