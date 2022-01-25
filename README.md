# cv-sitesi
* cv-backend projesini çalıştırmadan önce
``` create database db_resume  ```
veri tabanını oluşturun.
* cv-backend çalıştırdıktan sonra veri tabanına aşağıdaki rolleri ekleyin.

```
INSERT INTO roles (name) VALUES ('ROLE_USER');
INSERT INTO roles (name) VALUES ('ROLE_ADMIN');

```
cv-Frontend çalıştırmadan önce  
``` npm install  ```
komutunu çalıştırın.
Kulllanıcı oluşturduktan sonra kullanıcıya veri tabanından sadece admin rolünü ekleyin.
