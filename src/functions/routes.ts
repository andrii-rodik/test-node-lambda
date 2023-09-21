import { handlerPath } from '@libs/handler-resolver';
import { Chat } from '../models/Chat';
import { User } from '../models/User';
import { UserInChat } from '../models/UserInChat';
export const functions = {
	createUser: {
		handler: `${handlerPath(__dirname)}/createUser.main`,
		events: [
			{
				http: {
					method: 'post',
					path: 'user',
					request: {
						schemas: {
							'application/json': User.getSchema(),
						},
					},
				},
			},
		],
	},
	getAllUsers: {
		handler: `${handlerPath(__dirname)}/getAllUsers.main`,
		events: [
			{
				http: {
					method: 'get',
					path: 'user',
				},
			},
		],
	},
	getOneUser: {
		handler: `${handlerPath(__dirname)}/getOneUser.main`,
		events: [
			{
				http: {
					method: 'get',
					path: 'user/{id}',
				},
			},
		],
	},
	getAllChats: {
		handler: `${handlerPath(__dirname)}/getAllChats.main`,
		events: [
			{
				http: {
					method: 'get',
					path: 'chat',
				},
			},
		],
	},
	createChat: {
		handler: `${handlerPath(__dirname)}/createChat.main`,
		events: [
			{
				http: {
					method: 'post',
					path: 'chat',
					request: {
						schemas: {
							'application/json': Chat.getSchema(),
						},
					},
				},
			},
		],
	},
	getOneChat: {
		handler: `${handlerPath(__dirname)}/getOneChat.main`,
		events: [
			{
				http: {
					method: 'get',
					path: 'chat/{id}',
				},
			},
		],
	},
	attachUserToChat: {
		handler: `${handlerPath(__dirname)}/attachUserToChat.main`,
		events: [
			{
				http: {
					method: 'post',
					path: 'attachUserToChat',
					request: {
						schemas: {
							'application/json': UserInChat.getSchema(),
						},
					},
				},
			},
		],
	},
	removeUserFromChat: {
		handler: `${handlerPath(__dirname)}/removeUserFromChat.main`,
		events: [
			{
				http: {
					method: 'post',
					path: 'removeUserFromChat',
					request: {
						schemas: {
							'application/json': UserInChat.getSchema(),
						},
					},
				},
			},
		],
	},
	getUsersInChat: {
		handler: `${handlerPath(__dirname)}/getUsersInChat.main`,
		events: [
			{
				http: {
					method: 'get',
					path: 'getUsersInChat/{chatid}',
				},
			},
		],
	},
};
