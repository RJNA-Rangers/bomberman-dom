import { createNode, text } from "./engine.js"
// takes two arrays as a parameter and returns a new array
// with the merged values, but only up until the shortest length
//  of both given arrays
const zip = (a, b) => {
    const zipped = []
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
        zipped.push([a[i], b[i]])
    }
    return zipped
}

// returns array of function to apply to the attributes of DOM,
// in accordance to the new attribute object
const diffAttrs = (oldAttrs, newAttrs) => {
    const patches = []
    // set new attributes
    for (const [k, v] of Object.entries(newAttrs)) {
        patches.push(node => {
            if (node.nodeType != Node.TEXT_NODE)
                node.setAttribute(k, v)
            return node
        })
    }
    // remove old atrributes
    for (const [k] of Object.entries(oldAttrs)) {
        if (!(k in newAttrs)) {
            patches.push(node => {
                if (node.nodeType != Node.TEXT_NODE)
                    node.removeAttribute(k)
                return node
            })
        }
    }
    return node => {
        for (const patch of patches) {
            patch(node)
        }
    }
}

// returns array of function to apply to the properties of DOM,
// in accordance to the new property object
const diffProperty = (oldProperty, newProperty) => {
    const patches = []
    // set new properties
    for (const [k, v] of Object.entries(newProperty)) {
        patches.push(node => {
            node[k] = v
            return node
        })
    }
    // remove old attributes
    for (const [k] of Object.entries(oldProperty)) {
        if (!(k in newProperty)) {
            patches.push(node => {
                delete node.k
                return node
            })
        }
    }
    return node => {
        for (const patch of patches) {
            patch(node)
        }
    }
}

// returns array of function to apply to the children of DOM,
// in accordance to the new attribute object
const diffChildren = (oldVChildren, newVChildren) => {
    const childPatches = []
    // changes the content of children within the same range of previous state.
    for (const [oldVChild, newVChild] of zip(oldVChildren, newVChildren)) {
        if (typeof oldVChild === "string" || typeof newVChild === "string") {
            if (oldVChild !== newVChild) {
                childPatches.push((node) => {
                    node.replaceWith(text(newVChild));
                    return node;
                });
            }
        } else {
            childPatches.push(diff(oldVChild, newVChild));
        }
    }

    // adds additional children
    const additionalPatches = []
    const additionalElements = newVChildren.slice(oldVChildren.length)
    for (const addVChild of additionalElements) {
        if (typeof addVChild == "string") {
            additionalPatches.push(node => {
                node.appendChild(text(addVChild))
                return node
            })
        } else {
            additionalPatches.push(node => {
                const newNode = createNode(addVChild)
                node.appendChild(newNode)
                return node
            })
        }
    }

    // removes deleted children
    const removalPatches = [];
    for (const removeVChild of oldVChildren.slice(newVChildren.length)) {
        removalPatches.push(node => {
            node.removeChild(node.lastChild);
            return node;
        });
    }

    return parent => {
        // applies corresponding function child node (patch= function, child= child node)
        for (const [patch, child] of zip(childPatches, parent.childNodes)) {
            patch(child)
        }
        // appends child to parent
        for (const patch of additionalPatches) {
            patch(parent)
        }
        // removes child from parent
        for (const patch of removalPatches) {
            patch(parent)
        }

        return parent
    }
}

// Performs a diff between two virtual DOM and creates a patch
// function that is be applied to the real DOM, updating it.
const diff = (oldVD, newVD) => {
    // Handle the case where newVD is undefined (i.e., node should be removed)
    if (newVD === undefined) {
        return node => {
            node.remove();
            return undefined;
        };
    }

    // Handle the case where either oldVD or newVD is a string
    if (typeof oldVD === "string" || typeof newVD === "string") {
        if (oldVD === newVD) {
            return node => {
                const newNode = createNode(newVD);
                node.replaceWith(newNode);
                return newNode;
            };
        } else {
            return node => undefined;
        }
    }

    // Handle the case where oldVD and newVD have different tags
    if (oldVD.tag !== newVD.tag) {
        return node => {
            const newNode = createNode(newVD);
            node.replaceWith(newNode);
            return newNode;
        };
    }

    // Perform diffing for attributes, properties, and children
    const patchAttrs = diffAttrs(oldVD.attrs, newVD.attrs);
    const patchProperties = diffProperty(oldVD.property, newVD.property);
    const patchChildren = diffChildren(oldVD.children, newVD.children);

    // Return the patch function that applies the diffing changes to the real DOM
    return node => {
        patchAttrs(node);
        patchChildren(node);
        patchProperties(node);
        return node;
    };
};


export default diff