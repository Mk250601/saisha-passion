# Intensive Solution Bank: Month 2 (Weeks 5-8)

This document contains the ultra-detailed reference solutions for the second month of Saisha's intensive curriculum.

---

## Week 5: Dictionaries & Key-Value Logic

### Day 1: Dictionary Basics
#### 1. Create a phone book dictionary
- **Input**: `name="Saisha", phone="9876543210"`
- **Output**: `{"Saisha": "9876543210"}`
```python
phone_book = {"Saisha": "9876543210"}
```

#### 2. Add, update, and delete entries
- **Input**: `Add "Tutor": "123"`, `Update "Saisha": "000"`, `Delete "Tutor"`
- **Output**: `{"Saisha": "000"}`
```python
phone_book["Tutor"] = "123"
phone_book["Saisha"] = "000"
del phone_book["Tutor"]
```

### Week 6: Files & Persistence
#### Day 1: Write Mode
1. **Save a user's name to a .txt file**
   - **Input**: `"Saisha"`
   - **Output**: File `name.txt` containing `Saisha`
```python
with open("name.txt", "w") as f:
    f.write("Saisha")
```

### Week 7: Search & Sort Foundations
#### Day 1: Linear vs Binary
1. **Linear Search on an unsorted list**
   - **Input**: `arr = [5, 2, 9, 1, 5, 6], target = 9`
   - **Output**: `2` (Index)
```python
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target: return i
    return -1
```

### Week 8: OOP (Object Oriented Programming)
#### Day 1: Classes & Objects
1. **Create a Student class with name and age**
   - **Input**: `name="Saisha", age=10`
   - **Output**: `Student object with name Saisha and age 10`
```python
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age

s = Student("Saisha", 10)
```
