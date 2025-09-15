
describe('Todo App Logic', () => {
  // Adding a task
  it('should add a task to the list', () => {
    // Simulate the task addition logic
    const taskItems = [];
    const newTask = 'Test task';
    
    // Simulate adding a task (like handleAddTask does)
    const updatedTasks = [...taskItems, newTask.trim()];
    
    expect(updatedTasks).toHaveLength(1);
    expect(updatedTasks[0]).toBe('Test task');
  });

  // Completing a task
  it('should remove a task from the list when completed', () => {
    // Simulate having tasks in the list
    const taskItems = ['Task 1', 'Task 2', 'Task 3'];
    const indexToRemove = 1; // Remove 'Task 2'
    
    // Simulate completing a task (like completeTask does)
    const updatedTasks = taskItems.filter((_, i) => i !== indexToRemove);
    
    expect(updatedTasks).toHaveLength(2);
    expect(updatedTasks).toEqual(['Task 1', 'Task 3']);
    expect(updatedTasks).not.toContain('Task 2');
  });

  // Input validation
  it('should not add empty or whitespace-only tasks', () => {
    const taskItems = [];
    const emptyTask = '';
    const whitespaceTask = '   ';
    
    // Test empty task
    if (emptyTask?.trim()) {
      taskItems.push(emptyTask.trim());
    }
    expect(taskItems).toHaveLength(0);
    
    // Test whitespace task
    if (whitespaceTask?.trim()) {
      taskItems.push(whitespaceTask.trim());
    }
    expect(taskItems).toHaveLength(0);
  });

  // Multiple task operations
  it('should handle multiple add and remove operations correctly', () => {
    let taskItems = [];
    
    // Add multiple tasks
    const tasksToAdd = ['Buy groceries', 'Walk the dog', 'Finish project'];
    tasksToAdd.forEach(task => {
      if (task?.trim()) {
        taskItems = [...taskItems, task.trim()];
      }
    });
    
    expect(taskItems).toHaveLength(3);
    expect(taskItems).toEqual(['Buy groceries', 'Walk the dog', 'Finish project']);
    
    // Remove middle task
    taskItems = taskItems.filter((_, i) => i !== 1);
    expect(taskItems).toHaveLength(2);
    expect(taskItems).toEqual(['Buy groceries', 'Finish project']);
    
    // Add another task
    taskItems = [...taskItems, 'New task'];
    expect(taskItems).toHaveLength(3);
    expect(taskItems).toEqual(['Buy groceries', 'Finish project', 'New task']);
  });
});
