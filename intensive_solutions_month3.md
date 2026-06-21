# Intensive Solution Bank: Month 3 (Weeks 9-12)

This document contains the ultra-detailed reference solutions for the third month of Saisha's intensive curriculum, focusing on Web Development.

---

## Week 9: HTML Structure & Markup

### Day 1: Document Flow
#### 1. Build a basic HTML document with all required tags
- **Action**: Create an `index.html` file.
- **Expected Outcome**: A valid HTML page structure.
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Saisha's Web Prep</title>
</head>
<body>
    <h1>Welcome to my first web page!</h1>
</body>
</html>
```

### Week 10: CSS & Professional Styling
#### Day 1: Visual Foundations
1. **Style a <div> as a color-coded box**
   - **Action**: Apply CSS to a div with id `box`.
   - **Expected Outcome**: A 100x100 blue box with 20px padding.
```css
#box {
    width: 100px;
    height: 100px;
    background-color: blue;
    padding: 20px;
    margin: 10px;
}
```

### Week 11: JavaScript & Browser Logic
#### Day 1: JS Foundations
1. **Change the text of an <h1> when a button is clicked**
   - **Action**: Click button with id `changeBtn`.
   - **Expected Outcome**: Header text changes to "Logic Activated!".
```javascript
const btn = document.getElementById('changeBtn');
const header = document.querySelector('h1');

btn.onclick = () => {
    header.innerText = "Logic Activated!";
};
```

### Week 12: DOM Manipulation & Mini Apps
#### Day 1: Element Creation
1. **Add a new <li> to a list via button click**
   - **Action**: Enter "Learn DOM" and click "Add".
   - **Expected Outcome**: A new list item "Learn DOM" appears in the `<ul>`.
```javascript
function addItem() {
    const text = document.getElementById('itemInput').value;
    const li = document.createElement('li');
    li.innerText = text;
    document.getElementById('myList').appendChild(li);
}
```
