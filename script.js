// =====================================================
// CONTACT MANAGEMENT SYSTEM
// Main JavaScript File
// Includes:
// 1. Contact Management
// 2. Binary Search Tree (BST)
// 3. Hashing
// 4. Local Storage
// =====================================================


// =====================================================
// CONTACT STORAGE
// =====================================================

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];


// Save contacts to browser storage
function saveContacts() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}


// =====================================================
// ADD CONTACT
// =====================================================

function addContactData(name, phone, email) {

    name = name.trim();
    phone = phone.trim();
    email = email.trim();

    if (name === "" || phone === "" || email === "") {
        return {
            success: false,
            message: "Please fill all fields."
        };
    }

    // Check duplicate phone number
    const duplicate = contacts.some(
        contact => contact.phone === phone
    );

    if (duplicate) {
        return {
            success: false,
            message: "This phone number already exists."
        };
    }

    const contact = {
        name: name,
        phone: phone,
        email: email
    };

    contacts.push(contact);

    saveContacts();

    return {
        success: true,
        message: "Contact added successfully!",
        contact: contact
    };
}


// =====================================================
// DELETE CONTACT
// =====================================================

function deleteContactData(index) {

    if (index < 0 || index >= contacts.length) {
        return false;
    }

    contacts.splice(index, 1);

    saveContacts();

    return true;
}


// =====================================================
// SEARCH CONTACT
// =====================================================

function searchContactData(searchText) {

    searchText = searchText.trim().toLowerCase();

    if (searchText === "") {
        return contacts;
    }

    return contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchText) ||
        contact.phone.toLowerCase().includes(searchText)
    );
}


// =====================================================
// BINARY SEARCH TREE
// =====================================================

class ContactBSTNode {

    constructor(contact) {

        this.contact = contact;

        this.left = null;
        this.right = null;
    }
}


class ContactBST {

    constructor() {
        this.root = null;
    }


    // Insert contact into BST
    insert(contact) {

        this.root = this.insertNode(
            this.root,
            contact
        );
    }


    insertNode(node, contact) {

        if (node === null) {
            return new ContactBSTNode(contact);
        }

        const newName =
            contact.name.toLowerCase();

        const currentName =
            node.contact.name.toLowerCase();


        if (newName < currentName) {

            node.left =
                this.insertNode(
                    node.left,
                    contact
                );

        } else if (newName > currentName) {

            node.right =
                this.insertNode(
                    node.right,
                    contact
                );
        }

        return node;
    }


    // Search contact in BST
    search(name) {

        return this.searchNode(
            this.root,
            name.toLowerCase()
        );
    }


    searchNode(node, name) {

        if (node === null) {
            return null;
        }

        const currentName =
            node.contact.name.toLowerCase();


        if (name === currentName) {
            return node.contact;
        }


        if (name < currentName) {

            return this.searchNode(
                node.left,
                name
            );

        } else {

            return this.searchNode(
                node.right,
                name
            );
        }
    }


    // Inorder Traversal
    inorder() {

        const result = [];

        this.inorderTraversal(
            this.root,
            result
        );

        return result;
    }


    inorderTraversal(node, result) {

        if (node === null) {
            return;
        }

        this.inorderTraversal(
            node.left,
            result
        );

        result.push(node.contact);

        this.inorderTraversal(
            node.right,
            result
        );
    }
}


// =====================================================
// CREATE BST FROM CONTACTS
// =====================================================

function createBST() {

    const bst = new ContactBST();

    contacts.forEach(contact => {
        bst.insert(contact);
    });

    return bst;
}


// =====================================================
// HASH TABLE
// =====================================================

const HASH_TABLE_SIZE = 10;


class ContactHashTable {

    constructor(size = HASH_TABLE_SIZE) {

        this.size = size;

        this.table = [];

        this.initialize();
    }


    // Create empty buckets
    initialize() {

        this.table = [];

        for (let i = 0; i < this.size; i++) {
            this.table.push([]);
        }
    }


    // Hash function
    hashFunction(key) {

        key = key.toLowerCase();

        let hash = 0;

        for (let i = 0; i < key.length; i++) {

            hash =
                (hash * 31 +
                key.charCodeAt(i)) %
                this.size;
        }

        return hash;
    }


    // Insert contact
    insert(contact) {

        const index =
            this.hashFunction(contact.name);

        this.table[index].push(contact);

        return index;
    }


    // Search contact
    search(name) {

        const index =
            this.hashFunction(name);

        const bucket =
            this.table[index];

        const contact =
            bucket.find(item =>
                item.name.toLowerCase() ===
                name.toLowerCase()
            );

        return {
            contact: contact || null,
            index: index
        };
    }


    // Clear table
    clear() {
        this.initialize();
    }
}


// =====================================================
// CREATE HASH TABLE FROM CONTACTS
// =====================================================

function createHashTable() {

    const hashTable =
        new ContactHashTable();

    contacts.forEach(contact => {
        hashTable.insert(contact);
    });

    return hashTable;
}


// =====================================================
// GET ALL CONTACTS
// =====================================================

function getAllContacts() {
    return contacts;
}


// =====================================================
// CLEAR ALL CONTACT DATA
// =====================================================

function clearAllContacts() {

    contacts = [];

    localStorage.removeItem("contacts");
}


// =====================================================
// SORT CONTACTS ALPHABETICALLY
// =====================================================

function sortContactsAlphabetically() {

    return [...contacts].sort(
        (a, b) =>
            a.name.localeCompare(b.name)
    );
}


// =====================================================
// PROJECT INFORMATION
// =====================================================

const projectInfo = {

    title: "Contact Management System",

    dataStructures: [
        "Binary Search Tree",
        "Hash Table"
    ],

    features: [
        "Add Contact",
        "View Contacts",
        "Search Contact",
        "Delete Contact",
        "BST Search",
        "BST Inorder Traversal",
        "Hash Search",
        "Collision Handling",
        "Local Storage"
    ]
};


// =====================================================
// CONSOLE MESSAGE
// =====================================================

console.log(
    "Contact Management System loaded successfully."
);

console.log(
    "Data Structures: BST + Hashing"
);