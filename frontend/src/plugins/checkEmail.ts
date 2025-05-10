function checkEmail(email: string[]): boolean {
    // Regular expression for validating an Email
    const result =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    for (let i = 0; i < email.length; i++) {
        if (!email[i].match(result)) {
            return false;
        }
    }
    return true;
}

export default checkEmail;
