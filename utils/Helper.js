/**
 * Utility functions
 * 6/28/2021
 * Martin Alemajoh
 */

class Helper {

    /**
     * Return a formatted data: MM-DD-YYYY
     */
    static getDate() {
        const date = new Date();
        return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
    }


    /**
     * Generates code of number length.
     * @param {number} number length of code to generate
     * @returns {string} a string representing the code.
     */
    static getCode(number) {
        let code = "";
        for (let i = 0; i < number; i++) {
            const random = Math.floor(Math.random() * 10);
            code += random.toString(10);
        }

        return code;
    }

    /**
     * Builds an html template
     * @param {string} href 
     * @param {string} type 
     * @returns 
     */
    static async buildEmailTemplate(href, type) {
        const template = await Crud.read(`${type}.html`);
        template.replace("{#}", `'${href}'`);
        return template;
    }
}

module.exports = Helper;
