import requests

def load_credentials(file_path):
    credentials = []
    with open(file_path, 'r') as file:
        for line in file:
            parts = line.strip().split(',')
            if len(parts) == 3:
                credentials.append({
                    'domain': parts[0],
                    'username': parts[1],
                    'password': parts[2]
                })
    return credentials

def login_to_domain(domain, username, password):
    login_url = f'https://{domain}/login'  # Adjust based on the actual login endpoint
    payload = {
        'username': username,
        'password': password
    }

    try:
        response = requests.post(login_url, data=payload)
        if response.ok:
            print(f'Successfully logged into {domain}')
        else:
            print(f'Failed to log into {domain}: {response.status_code} - {response.text}')
    except Exception as e:
        print(f'Error logging into {domain}: {e}')

def main():
    file_path = 'credentials.txt'
    credentials = load_credentials(file_path)

    for cred in credentials:
        login_to_domain(cred['domain'], cred['username'], cred['password'])

if __name__ == '__main__':
    main()