const BCRYPT = require("bcrypt"),
    JWT = require("jsonwebtoken");

const user_model = require("../models/User");

const salt_rounds = 10;

const generate_jwt = payload => {
    return JWT.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "1d"
    });
};

const generate_user_object = user => {
    const payload = {
            Name: user.Name,
            Email: user.Email,
            Date: user.Date
        },
        new_token = generate_jwt(payload);

    return (
        {
            user: payload,
            token: new_token
        }
    )
};

const VALIDATE_EMAIL = email => {
    const REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return REGEX.test(email.toLowerCase());
};

class UserController {
    register(req, res) {
        const register_data = req.body;

        const email_is_valid = VALIDATE_EMAIL(register_data.Email);

        if (email_is_valid) {
            user_model.findOne({Email: register_data.Email}, (e, user) => {
                if (e) {
                    console.error(`error while searching user email on DB ${register_data.email}`, e);
                    res.sendStatus(500);
                }
                else {
                    if (user) {
                        res.json(
                            {
                                error: true,
                                error_msg: "Email address is already in use.",
                                error_type: "email"
                            }
                        );
                    }
                    else {
                        BCRYPT.hash(register_data.Password, salt_rounds, (e, hash) => {
                            if (e) {
                                console.error("error while hashing password", e);
                                res.sendStatus(500);
                            }
                            else {
                                const new_user = new user_model({
                                    Name: register_data.Name,
                                    Email: register_data.Email,
                                    Password: hash
                                });

                                new_user.save(e => {
                                    if (e) {
                                        console.error("error while saving to mongoDB", e);
                                        res.sendStatus(500);
                                    } else {
                                        const response = generate_user_object(new_user);
                                        res.json(response);
                                        // in case if we want the user to be automatically logged in after signup later. Sending user info back with new token that can be saved to their local storage that can be used for authentication.
                                    }
                                });
                            }
                        });
                    }
                }
            });
        } else {
            console.error("Email address format incorrect");
            res.json(
                {
                    error: true,
                    error_msg: "No email address entered!",
                    error_type: "email"
                }
            );
        }
    };

    login(req, res) {
        const login_data = req.body;

        user_model.findOne({Name: login_data.Name}, (e, user) => {
            if (e) {
                console.error(e);
                res.sendStatus(500);
            }
            else {
                if (user) {
                    BCRYPT.compare(login_data.Password, user.Password).then(same => {
                        if (same) {
                            const response = generate_user_object(user);
                            res.json(response);
                        } else {
                            console.error("Password entered is incorrect!");
                            res.json(
                                {
                                    error: true,
                                    error_msg: "Password entered is incorrect!",
                                    error_type: "password"
                                }
                            )
                        }
                    });
                }
                else {
                    console.error("Username not found on DB");
                    res.json(
                        {
                            error: true,
                            error_msg: "Username not found!",
                            error_type: "username"
                        }
                    )
                }
            }
        });
    };

}

module.exports = UserController;