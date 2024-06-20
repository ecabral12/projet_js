import { UserController } from '../src/user/user.controller';
import { UserService } from '../src/user/user-service.ts';
import { User } from '../src/user/User.ts';

describe('UserController', () => {
    let userController: UserController;
    let userService: UserService;

    beforeEach(() => {
        //userService = new UserService();
        userController = new UserController(userService);
    });

    describe('add', () => {
        it('should add a new user', () => {
            const username = 'testUser';
            const addedUser: User = userController.add(username);

            expect(addedUser).toBeTruthy();
            expect(addedUser.username).toBe(username);
        });

        it('should return null if username is empty', () => {
            const emptyUsername = '';
            const addedUser: User | null = userController.add(emptyUsername);

            expect(addedUser).toBeNull();
        });
    });
});