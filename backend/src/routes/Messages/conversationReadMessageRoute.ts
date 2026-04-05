import {Router, Request, Response} from 'express';
import {pool} from "../../db/db";
import {getSession} from "../../auth/session";

const router = Router();
