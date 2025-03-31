"""
def fibonacci(n):
    if n == 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fibonacci(n - 1) + fibonacci(n - 2)
"""

# the issue with the above function is that it is not optimal for larger numbers due to high complexity

def fibonacci(n):
    # if n is less than 0 return an error message
    if n < 0:
        return "Error, negative numbers not allowed"
    # if n is 0 return 0
    elif n == 0:
        return 0
    # if n is 1 return 1
    elif n == 1:
        return 1
    else:
        # set value of a to 0 and b to 1
        a = 0
        b = 1
        print(a)
        print(b)
        # initializa a for loop that iterates between 2 and n
        for i in range(2,n):
            # set value of c to be a + b
            c = a+b
            # change a to point to value of b
            a = b
            # change b to point to value of c, that is, a + b
            b = c
            # print c 
            print(c)
    
fibonacci(100)