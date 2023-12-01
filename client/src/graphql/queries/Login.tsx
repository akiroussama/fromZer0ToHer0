import { gql } from '@apollo/client';

class AuthService {
  LOGIN = gql`
        query LOGIN($data: UserInput!) {
            login(data: $data) 
        }
    `;

  // other methods related to authentication can go here
}

export default new AuthService();
