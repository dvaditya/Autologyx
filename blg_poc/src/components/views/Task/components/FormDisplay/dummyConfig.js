export const module1Onetab = {
    "forms": [
        {
            "Module 1 Form A": {
                "schema": {
                    "tristate 1": {
                        "type": "deficiencies"
                    },
                    "tristate 2": {
                        "type": "deficiencies"
                    },
                    "tristate 3": {
                        "type": "deficiencies"
                    },
                    "tristate 4": {
                        "type": "deficiencies"
                    },
                    "tristate 5": {
                        "type": "deficiencies"
                    },
                    "tristate 6": {
                        "type": "deficiencies"
                    },
                    "checkbox 1": {
                        "type": "checkbox"
                    },
                    "checkbox 2": {
                        "type": "checkbox"
                    },
                    "checkbox 3": {
                        "type": "checkbox"
                    },
                    "checkbox 4": {
                        "type": "checkbox"
                    },
                    "freeform 1": {
                        "type": "freeform"
                    },
                    "freeform 2": {
                        "type": "freeform"
                    },
                    "freeform 3": {
                        "type": "freeform"
                    },
                    "freeform 4": {
                        "type": "freeform"
                    },
                    "comments 1": {
                        "type": "comments"
                    },
                    "comments 2": {
                        "type": "comments"
                    },
                    "select 1": {
                        "type": "select",
                        "options": [
                            "one",
                            "two",
                            "three",
                            "four",
                            "five"
                        ]
                    },
                    "select 2": {
                        "type": "select",
                        "options": [
                            "red",
                            "yellow",
                            "blue"
                        ]
                    },
                    "Group 1": {
                        "type": "grouping",
                        "fields": {
                            "select 1": {
                                "type": "select",
                                "options": [
                                    "one",
                                    "two",
                                    "three",
                                    "four",
                                    "five"
                                ]
                            },
                            "checkbox 1": {
                                "type": "checkbox"
                            },
                            "checkbox 2": {
                                "type": "checkbox",
                                "displayWhen": [
                                    {
                                        "op": "eq",
                                        "args": [
                                            "checkbox 1",
                                            true
                                        ]
                                    }
                                ]
                            },
                            "checkbox 3": {
                                "type": "checkbox",
                                "displayWhen": [
                                    {
                                        "op": "eq",
                                        "args": [
                                            "checkbox 2",
                                            true
                                        ]
                                    }
                                ]
                            }
                        }
                    },
                    "Group 2": {
                        "type": "grouping",
                        "fields": {
                            "select 1": {
                                "type": "select",
                                "options": [
                                    "one",
                                    "two",
                                    "three",
                                    "four",
                                    "five"
                                ]
                            },
                            "checkbox 1": {
                                "type": "checkbox"
                            },
                            "checkbox 2": {
                                "type": "checkbox",
                                "displayWhen": [
                                    {
                                        "op": "eq",
                                        "args": [
                                            "checkbox 1",
                                            true
                                        ]
                                    }
                                ]
                            },
                            "checkbox 3": {
                                "type": "checkbox",
                                "displayWhen": [
                                    {
                                        "op": "eq",
                                        "args": [
                                            "checkbox 2",
                                            true
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                },
                "tabs": [
                    {
                        "label": "Tab 1",
                        "items": [
                            "tristate 1",
                            "tristate 2",
                            "tristate 3",
                            "tristate 4",
                            "tristate 5",
                            "tristate 6",
                            "checkbox 1",
                            "checkbox 2",
                            "checkbox 3",
                            "checkbox 4",
                            "select 1",
                            "select 2",
                            "Group 1",
                            "Group 2"
                        ]
                    }
                ]
            }
        }
    ],
    "structure": {
        "moduleName": "Module 1",
        "instructions": "Drag up to five documents here",
        "maxFiles": 5,
        "subfolders": []
    }
}

export const module1Twotabs = {
    "forms": [
        null,
        {
            "Module 1 Form A": {
                "schema": {
                    "tristate 1": {
                        "type": "deficiencies"
                    },
                    "tristate 2": {
                        "type": "deficiencies"
                    },
                    "tristate 3": {
                        "type": "deficiencies"
                    },
                    "tristate 4": {
                        "type": "deficiencies"
                    },
                    "tristate 5": {
                        "type": "deficiencies"
                    },
                    "tristate 6": {
                        "type": "deficiencies"
                    },
                    "checkbox 1": {
                        "type": "checkbox"
                    },
                    "checkbox 2": {
                        "type": "checkbox"
                    },
                    "checkbox 3": {
                        "type": "checkbox"
                    },
                    "checkbox 4": {
                        "type": "checkbox"
                    },
                    "freeform 1": {
                        "type": "freeform"
                    },
                    "freeform 2": {
                        "type": "freeform"
                    },
                    "freeform 3": {
                        "type": "freeform"
                    },
                    "freeform 4": {
                        "type": "freeform"
                    },
                    "comments 1": {
                        "type": "comments"
                    },
                    "comments 2": {
                        "type": "comments"
                    },
                    "select 1": {
                        "type": "select",
                        "options": [
                            "one",
                            "two",
                            "three",
                            "four",
                            "five",
                        ]
                    },
                    "select 2": {
                        "type": "select",
                        "options": [
                            "red",
                            "yellow",
                            "blue"
                        ]
                    },
                    "Group 1": {
                        "type": "grouping",
                        "fields": {
                            "select 1": {
                                "type": "select",
                                "options": [
                                    "one",
                                    "two",
                                    "three",
                                    "four",
                                    "five",
                                ]
                            },
                            "checkbox 1": {
                                "type": "checkbox"
                            },
                            "checkbox 2": {
                                "type": "checkbox",
                                "displayWhen": [
                                    {
                                        "op": "eq",
                                        "args": [
                                            "checkbox 1",
                                            true
                                        ]
                                    }
                                ]
                            },
                            "checkbox 3": {
                                "type": "checkbox",
                                "displayWhen": [
                                    {
                                        "op": "eq",
                                        "args": [
                                            "checkbox 2",
                                            true
                                        ]
                                    }
                                ]
                            },
                        }
                    },
                    "Group 2": {
                        "type": "grouping",
                        "fields": {
                            "select 1": {
                                "type": "select",
                                "options": [
                                    "one",
                                    "two",
                                    "three",
                                    "four",
                                    "five",
                                ]
                            },
                            "checkbox 1": {
                                "type": "checkbox"
                            },
                            "checkbox 2": {
                                "type": "checkbox",
                                "displayWhen": [
                                    {
                                        "op": "eq",
                                        "args": [
                                            "checkbox 1",
                                            true
                                        ]
                                    }
                                ]
                            },
                            "checkbox 3": {
                                "type": "checkbox",
                                "displayWhen": [
                                    {
                                        "op": "eq",
                                        "args": [
                                            "checkbox 2",
                                            true
                                        ]
                                    }
                                ]
                            },
                        }
                    },
                },
                "tabs": [
                    {
                        "label": "Tab 1",
                        "items": [
                            "tristate 1",
                            "tristate 2",
                            "tristate 3",
                            "tristate 4",
                            "tristate 5",
                            "tristate 6",
                        ]
                    },
                    {
                        "label": "Tab 2",
                        "items": [
                            "checkbox 1",
                            "checkbox 2",
                            "checkbox 3",
                            "checkbox 4",
                            "select 1",
                            "select 2",
                            "Group 1",
                            "Group 2"
                        ]
                    }
                ]
            }
        }
    ],
    "structure": {
        "moduleName": "Module 1",
        "instructions": "Drag up to five documents here",
        "maxFiles": 5,
        "subfolders": []
    },
}

export const module2 = {
    structure: {
        moduleName: "Module 2",
        instructions: "Drag a document into each sub folder you have files for",
        maxFiles: 0,
        subfolders: [
            {
                moduleName: "Module 2 sub 1",
                instructions: "",
                maxFiles: 1,
                subfolders: []
            },
            {
                moduleName: "Module 2 sub 2",
                instructions: "",
                maxFiles: 1,
                subfolders: []
            },
            {
                moduleName: "Module 2 sub 3",
                instructions: "",
                maxFiles: 1,
                subfolders: []
            },
            {
                moduleName: "Module 2 sub 4",
                instructions: "",
                maxFiles: 1,
                subfolders: []
            },
            {
                moduleName: "Module 2 sub 5",
                instructions: "",
                maxFiles: 1,
                subfolders: []
            },
            {
                moduleName: "Module 2 sub 6",
                instructions: "",
                maxFiles: 1,
                subfolders: []
            },
            {
                moduleName: "Module 2 sub 7",
                instructions: "",
                maxFiles: 1,
                subfolders: []
            },
            {
                moduleName: "Module 2 sub 8",
                instructions: "",
                maxFiles: 1,
                subfolders: []
            },
        ]
    },
}

