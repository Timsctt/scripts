enum Environments {
    local_environment = 'local',
    dev_environment = 'dev',
    prod_environment = 'prod',
    //Quality Assurance
    qa_environment = 'qa'
}

class Environment {
    private environment: String;

    constructor(environment: String) {
        this.environment = environment;
    }

    getPort(): Number {
        if (this.environment === Environments.prod_environment) {
            return 8000;
        } else if (this.environment === Environments.dev_environment) {
            return 8001;
        } else if (this.environment === Environments.qa_environment) {
            return 8002;
        } else {
            return 3001;
        }
    }

    getDBName(): String {
        if (this.environment === Environments.prod_environment) {
            return 'webchat_prod';
        } else if (this.environment === Environments.dev_environment) {
            return 'webchat_dev';
        } else if (this.environment === Environments.qa_environment) {
            return 'webchat_qa';
        } else {
            return 'webchat_local';
        }
    }

    getDBPort(): number {
        if (this.environment === Environments.prod_environment) {
            return 27021;
        } else if (this.environment === Environments.dev_environment) {
            return 27022;
        } else if (this.environment === Environments.qa_environment) {
            return 27023;
        } else {
            return 27020;
        }
    }
}

export default new Environment(Environments.local_environment);