
FROM maven:3.9-eclipse-temurin-21 AS builder


WORKDIR /app

COPY . .

RUN mvn clean package -DskipTests

FROM openjdk:21-slim

RUN useradd -m -s /bin/bash appuser

WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
RUN chown -R appuser:appuser /app

USER appuser


EXPOSE 8080


ENTRYPOINT ["java", "-jar", "app.jar"]
