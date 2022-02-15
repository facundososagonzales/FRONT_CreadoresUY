# CreadoresUy - taller de aplicaciones .net

Aplicación Front end para el proyecto `CreadoresUy` del taller desarrollo de aplicaciones .net.
>este proyecto requiere de su correspondiente [API REST](https://github.com/EdwinpistonC/-CreadoresUY-Grupo3-2021) para funcionar.

## Ejecutar proyecto

Ejecutar comando `ng serve`. Para acceder a la aplicacion ingresar a `http://localhost:4200/` (version localhost, version aws no disponible).

**Es necesario clonar el proyecto [-CreadoresUY-Grupo3-2021](https://github.com/EdwinpistonC/-CreadoresUY-Grupo3-2021) para el correcto funcionamiento de la aplicación angular.**


Ejecutar migraciones de la api rest (versión localhost): 
- dotnet ef --startup-project Api/Api.csproj migrations add prueba1 -p Persistence/Persistence.csproj

Para actualizar la base de datos con las migraciones realizadas:
- dotnet ef --startup-project Api/Api.csproj database update

## Visualización de alguanas funcionalidades

### Home
    ![Home](/FRONT_CreadoresUY/blob/main/src/assets/img/theme/s1.png)

## Modulos de la aplicación

### **Front offices**

- Módulo de autenticación, Registro, Social Login y olvido de contraseña.
        
- Módulo de Home y feed

- Módulo de búsqueda y categorías

- Módulo de suscripciones

- Módulo de reporte de usuarios y contenido

- Módulo de seguimiento de creadores

- Módulo de perfil de usuario

- Módulo de conversión a creador

- Módulo de Dashboard de creador:

- Submódulo de posts

- Submódulo de configuración

- Submódulo de estadísticas

- Submódulo de mensajería:

    - Configuracion de pagina del creador

    - Configuración de suscripciones

    - Configuración de mensajes de bienvenida

### **Back offices**

- Módulo de configuraciones:

    - Configuración de beneficios genéricos

    - Configuración de suscripciones base

    - Configuración de categorías

- Módulo de Administración:

  - Usuarios

  - Creadores

  - Contenido

  - Administradores

- Módulo de estadísticas

  - Estadísticas de uso
    
  - Estadísticas de financieras

### **Opcionales implementados**

- Conexión con sistemas de pago internacionales no tarjeta para pago y cobro de
suscripciones, como PayPal 

- Utilización de base de datos no relacional (MongoDB)

- Desarrollo de la aplicación móvil en Xamarin