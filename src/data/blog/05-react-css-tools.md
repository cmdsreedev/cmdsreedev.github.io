---
title: "Useful Tools and CSS Practices in React"
description: "Answers to common questions about useful tools and css practices in react"
pubDate: 2025-06-23
pubDatetime: 2025-06-23T00:00:00.000Z
author: "Sreevisakh"
draft: false
tags: ["react", "css", "storybook", "vscode", "pico.css", "frontend"]
---

import { useState } from "react";
import { Button } from "storybook-button";
import "pico.css";

export default {
title: "Example/Button",
component: Button,
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
primary: true,
label: "Button",
};

export const Secondary = Template.bind({});
Secondary.args = {
label: "Button",
};

export const Large = Template.bind({});
Large.args = {
size: "large",
label: "Button",
};

export const Small = Template.bind({});
Small.args = {
size: "small",
label: "Button",
};
