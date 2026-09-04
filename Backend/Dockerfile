FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /workspace/app

# Copy only what is needed for dependency resolution first for better layer caching
COPY pom.xml ./
COPY src ./src

RUN mvn -B -DskipTests package

FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy the packaged jar from the build stage
COPY --from=build /workspace/app/target/*.jar app.jar

# Create non-root user/group and set ownership so the app runs as non-root
RUN groupadd -r spring && useradd -r -g spring -d /app -s /sbin/nologin spring \
	&& chown -R spring:spring /app

EXPOSE 8080

# Switch to non-root user
USER spring

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
