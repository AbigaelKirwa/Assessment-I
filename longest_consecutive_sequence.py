# return the longest sequence of numbers in an array

def find_longest_sequence(arr):
    # creating an empty list
    sequence_list = []
    # getting the minimum value
    min_value = min(arr)
    # enter the least value in sequence list
    sequence_list.append(min_value)
    # loop through the array as long as the maximum value + 1 exists in the array
    while max(sequence_list) + 1 in arr:
        # iterating through the array
        for i in arr:
            # check if i is equal to the maximum value in sequence list plus one
            if i == max(sequence_list) + 1:
                # if conidtion is true add i to the sequence list
                sequence_list.append(i)
    return sequence_list

print(find_longest_sequence([100, 4, 200, 1, 3, 2]))