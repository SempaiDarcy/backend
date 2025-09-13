# Что мы пытаемся сделать? 🚀

- **Открыть локальный порт наружу**, чтобы тестировщики, пользователи и другие заинтересованные стороны могли подключаться к нашему приложению, запущенному на `localhost`, из интернета.
- Главное убедиться, что проект **запущен на правильном порту** (например, `dev` и `watch`).

---

## Варианты реализации 🔧

### 1. **localhost.run** 🌐

1.1 **Копируем команду** (замените `8080` на ваш порт):

    ```bash
    ssh -R 80:localhost:8080 nokey@localhost.run
    ```

1.2 **Подтверждаем подключение** при появлении запроса:

    ```plaintext
    The authenticity of host 'localhost.run (45.174.754.69)' can't be established.
    RSA key fingerprint is SHA256:FV8IMJ4IYjYUTnd6oPqbRjaZf4c1EhhEBgeUdE94I.
    This key is not known by any other names.
    Are you sure you want to continue connecting (yes/no/[fingerprint])?
    ```

    Введите `yes` и нажмите Enter.

1.3 **Находим URL для проксирования**:

    В терминале появится множество текста. Чуть выше QR-кода нужно найти URL, который будет проксировать на `localhost`.

![localhost-run](https://gist.github.com/user-attachments/assets/2bec7d83-f8c1-4ff9-849e-57cf18dd4b1a)

---

### 2. **Ngrok** 🔒

2.1 **Скачиваем и устанавливаем Ngrok** с [официального сайта](https://ngrok.com/).

2.2 **Добавляем в package.json скрипт **, указав ваш локальный порт:

    ```bash
    ngrok": "ngrok http 3006
    ```
![](https://cdn.cacher.io/attachments/u/3nrn2cqk6rbmm/hGOZqiVhhc3a1LlgEIhAC5_M9_qatema/ngrok-script.png)

2.3 **Запускаем скрипт и получаем публичный URL**, который Ngrok предоставит для доступа к локальному серверу.
    ![](https://cdn.cacher.io/attachments/u/3nrn2cqk6rbmm/j1qYbQo5Cv5LgQURIn5qOAcbpwA4KSD9/ngrok-url.png)

---


