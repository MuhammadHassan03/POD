const express = require('express')
const mongoose = require('mongoose');
const { signup, login } = require('../../Services/Auth');

const authRoutes = express.Router();

authRoutes.post('/signup', signup).get('/login', login)

module.exports = {authRoutes}
