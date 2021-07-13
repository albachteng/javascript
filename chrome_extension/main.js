const DOMRegex = function(regex) {
    let output = [];
    document.querySelectorAll('*').forEach(element => {
        element.classList.forEach((className) => {
            if (regex.test(className) && !output.includes(element)) {
                output.push(element);
            }
        });
        if (regex.test(element.id) && !output.includes(element)) {
            output.push(element);
        }
        }
    );
    return output;
}

DOMRegex(/cookie/i).forEach(node => node.remove());
DOMRegex(/consent/i).forEach()