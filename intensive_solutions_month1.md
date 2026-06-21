# Intensive Solution Bank: Month 1 (Weeks 1-4)

This document contains the ultra-detailed reference solutions for the first month of Saisha's intensive curriculum.

---

## Week 1: Numbers & Loops

### Day 1: Variables & Operations
#### 1. Swap two numbers (without a temp variable)
- **Input**: `a = 5, b = 10`
- **Output**: `a = 10, b = 5`
```python
a = a + b
b = a - b
a = a - b
```

#### 2. Find the Maximum of three numbers
- **Input**: `12, 45, 7`
- **Output**: `45`
```python
max_val = max(12, 45, 7)
# or
if a >= b and a >= c: max_val = a
elif b >= a and b >= c: max_val = b
else: max_val = c
```

#### 3. Area of a circle and rectangle calculator
- **Input**: `radius = 7`, `length = 5, width = 4`
- **Output**: `Circle: 153.86`, `Rectangle: 20`
```python
circle_area = 3.14 * (7 ** 2)
rect_area = 5 * 4
```

### Day 2: Digit Logic
#### 1. Sum of Digits of a number
- **Input**: `1234`
- **Output**: `10`
```python
n = 1234
total = 0
while n > 0:
    total += n % 10
    n //= 10
```

#### 2. Reverse a Number (Mathematical approach)
- **Input**: `1234`
- **Output**: `4321`
```python
n = 1234
rev = 0
while n > 0:
    rev = (rev * 10) + (n % 10)
    n //= 10
```

#### 3. Count total digits in a number
- **Input**: `85432`
- **Output**: `5`
```python
count = len(str(85432))
```

### Day 3: Control Flow Mastery
#### 1. Prime Number Checker
- **Input**: `17`
- **Output**: `True`
```python
def is_prime(n):
    if n < 2: return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0: return False
    return True
```

#### 2. Sum of all even numbers from 1 to N
- **Input**: `N = 10`
- **Output**: `30`
```python
total = sum(i for i in range(2, 11, 2))
```

#### 3. Fibonacci sequence up to N terms
- **Input**: `N = 5`
- **Output**: `0, 1, 1, 2, 3`
```python
a, b = 0, 1
for _ in range(5):
    print(a)
    a, b = b, a + b
```

---

*(Continuing with Weeks 2-4 content)*

### Week 2: Patterns & Number Systems
#### Day 1: Palindrome & Logic
1. **Palindrome Number check**
   - **Input**: `n = 121`
   - **Output**: `True`
```python
s = str(121)
is_palindrome = s == s[::-1]
```

2. **Check if a number is a Perfect Square**
   - **Input**: `n = 16`
   - **Output**: `True`
```python
import math
n = 16
is_perfect = int(math.sqrt(n))**2 == n
```

3. **Find Average of N user inputs**
   - **Input**: `[10, 20, 30]`
   - **Output**: `20.0`
```python
nums = [10, 20, 30]
avg = sum(nums) / len(nums)
```

#### Day 3: Basic Patterns
1. **Print right-angled triangle of stars (*)**
   - **Input**: `n = 3`
   - **Output**: 
```
*
**
***
```
```python
for i in range(1, 4):
    print("*" * i)
```

### Week 3: Functions & Modular Design
#### Day 1: Function Basics
1. **Simple Interest function**
   - **Input**: `P=1000, R=5, T=2`
   - **Output**: `100.0`
```python
def calculate_si(p, r, t):
    return (p * r * t) / 100
```

### Week 3: Strings & Characters

#### Day 1: Char Reading
1. **Iterate and print every character**
   - **Input**: `"Python"`
   - **Output**: `P \n y \n t \n h \n o \n n`
```python
for char in "Python":
    print(char)
```

2. **Count Vowels and Consonants**
   - **Input**: `"hello"`
   - **Output**: `Vowels: 2, Consonants: 3`
```python
s = "hello"
vowels = "aeiou"
v_count = len([c for c in s if c in vowels])
c_count = len(s) - v_count
```

#### Day 2: String Methods
1. **Title Case Transformation**
   - **Input**: `"saisha k"`
   - **Output**: `"Saisha K"`
```python
name = "saisha k"
print(name.title()) 
```

2. **Whitespace Cleanup**
   - **Input**: `"  Gaming Laptop  "`
   - **Output**: `"Gaming Laptop"`
```python
title = "  Gaming Laptop  "
print(title.strip())
```

#### Day 3: Slicing Mastery
1. **Domain Extraction**
   - **Input**: `"saisha@gmail.com"`
   - **Output**: `"gmail.com"`
```python
email = "saisha@gmail.com"
domain = email.split("@")[1] 
```

2. **Reverse using slicing**
   - **Input**: `"Product"`
   - **Output**: `"tcudorP"`
#### Day 2: Advanced Functions
1. **Function to check Prime (is_prime)**
   - **Input**: `11`
   - **Output**: `True`
```python
def is_prime(n):
    if n < 2: return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0: return False
    return True
```
