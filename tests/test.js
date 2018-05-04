describe("Node creating", function() {
  describe("create Doubly Node", function() {
    it("constructor must throw Error if no data arg provided(null or undefined)", function() {
      function mustThrowError() {
        const dn = new DoublyNode();
      }
      assert.throws(mustThrowError, Error);
    });

    const dn = new DoublyNode({});

    it("data arg not null or undefined", function() {
      assert.notEqual(dn.data, null);
      assert.notEqual(dn.data, undefined);  
    });

    it("next = null", function() {
      assert.equal(dn.next, null);
    });

    it("prev = null", function() {
      assert.equal(dn.prev, null);  
    });
  });
});

describe("Doubly Linked List", function() {
  describe("create Doubly Linked List", function() {
    const dll = new DoublyLinkedList();
    it("head = null", function() {
      assert.equal(dll.head, null);
    });
    it("length = 0", function() {
      assert.equal(dll.length, 0);
    });
  });

  describe("CRUD operations", function () {
    describe("add(data) - add new node to the beginning", function () {
      const dll = new DoublyLinkedList();

      describe("Errors", function() {
        it("add() must throw error if there more than one argument", function() {
          function mustThrow() {
            dll.add(1, 2)
          }
          assert.throws(mustThrow, Error);
        });

        it("add() must throw error if argument type equal to null", function() {
          function mustThrow() {
            dll.add(null)
          }
          assert.throws(dll.add, Error);
        });

        it("add() must throw error if argument type equal to undefined", function() {
          function mustThrow() {
            dll.add(undefined)
          }
          assert.throws(dll.add, Error);
        });
      });

      describe("Actions", function() {
        it("after adding node list length increase by 1", function() {
          dll.add({});
          assert.equal(dll.length, 1);
        });
      })
    });

    describe("addLast(data) - add new node to the end", function() {
      describe("Errors", function() {
        const dll = new DoublyLinkedList();

        it("addLast() must throw error if there more than one argument", function() {
          function mustThrow() {
            dll.addLast(1, 2)
          }
          assert.throws(mustThrow, Error, "More than one argument");
        });

        it("addLast() must throw error if argument type equal to null", function() {
          function mustThrow() {
            dll.addLast(null)
          }
          assert.throws(mustThrow, Error, "Specify 'data' arg. What ever you want, but not 'null' or 'undefined'");
        });

        it("addLast() must throw error if argument type equal to undefined", function() {
          function mustThrow() {
            dll.addLast(undefined)
          }
          assert.throws(mustThrow, Error, "Specify 'data' arg. What ever you want, but not 'null' or 'undefined'");
        });
      });

      describe("Actions", function() {
        const dll = new DoublyLinkedList();

        dll.addLast("Node #1");
        dll.addLast("Node #2"); 

        it("addLast() must return new length of list", function() {
          assert.equal(dll.addLast("Node #3"), 3);
        });

        it("right order", function() {
          assert.equal(dll.findByIndex(0).data, "Node #1");
          assert.equal(dll.findByIndex(1).data, "Node #2");
          assert.equal(dll.findByIndex(2).data, "Node #3");
        });
      });
    });

    describe("remove() - remove node from the beginning", function () {
      const dll = new DoublyLinkedList();

      describe("Errors", function() {
        it("throw error if there any arguments passed", function() {
          function mustThrow() {
            dll.remove(1, 2)
          }
          assert.throws(mustThrow, Error);
        });

        it("throw error if list is empty", function() {
          function mustThrow() {
            dll.remove()
          }
          assert.throws(dll.remove, Error);
        });
      });

      describe("Actions", function() {
        it("must return new length", function() {
          dll.add({});
          assert.equal(dll.remove(), 0);

          dll.add({});
          dll.add({});
          assert.equal(dll.remove(), 1);
        });
      });
    });

    describe("removeLast() - remove last node", function() {
      describe("Errors", function() {
        it("throw error if there any arguments passed", function() {
          const dll = new DoublyLinkedList();
          function mustThrow() {
            dll.removeLast(1, 2);
          }
          assert.throws(mustThrow, Error, Errors.ARGUMENTS_DENIED);
        });
      });

      describe("Actions", function() {
        it("must return new length", function() {
          const dll = new DoublyLinkedList();
          dll.add(1);
          dll.add(2);
          assert.equal(dll.removeLast(), 1);
        });

        it("empty list must return null", function() {
          const dll = new DoublyLinkedList();
          assert.isNull(dll.removeLast());
        });        
      });
    });

    describe("removeAt(index)", function() {
      describe("Errors", function() {
        it("throw error if index not provided", function() {
          const dll = new DoublyLinkedList();
          function mustThrow() {
            dll.removeAt();
          }
          assert.throws(mustThrow, Error, Errors.MISSING_ARGUMENT);
        });

        it("throw error if index not Number", function() {
          const dll = new DoublyLinkedList();
          function mustThrow() {
            dll.removeAt("foo");
          }
          assert.throws(mustThrow, Error, Errors.INVALID_INDEX_TYPE);
        });

        it("throw error if not 0 <= index < length", function() {
          const dll = new DoublyLinkedList();
          function mustThrow() {
            dll.removeAt(-1);
          }
          assert.throws(mustThrow, Error, Errors.OUT_OF_RANGE);
        });
      });

      describe("Actions", function() {
        it("return new length", function() {
          const dll = new DoublyLinkedList();
          dll.add(1);
          dll.add(2);
          dll.add(3);
          assert.equal(dll.removeAt(0), 2);
        });

        it("index = 0", function() {
          const dll = new DoublyLinkedList();
          dll.add(1);
          dll.add(2);
          dll.add(3);
          dll.removeAt(0);
          assert.equal(dll.findByIndex(0).data, 2);
          assert.equal(dll.findByIndex(1).data, 1);
        });

        it("index = length - 1", function() {
          const dll = new DoublyLinkedList();
          dll.add(1);
          dll.add(2);
          dll.add(3);
          dll.removeAt(2);
          assert.equal(dll.findByIndex(0).data, 3);
          assert.equal(dll.findByIndex(1).data, 2);
        });

        it("0 < index < length-1", function() {
          const dll = new DoublyLinkedList();
          dll.add(1);
          dll.add(2);
          dll.add(3);
          dll.add(4);
          const length = dll.removeAt(2);
          assert.equal(dll.findByIndex(0).data, 4);
          assert.equal(dll.findByIndex(1).data, 3);
          assert.equal(dll.findByIndex(2).data, 1);
          assert.equal(length, dll.length);
        });
      });
    });

    describe("insertAt(data, index) - insert new node at specified index", function () {
 
      describe("Errors", function() {
        const dll = new DoublyLinkedList();

        it("throw error if there no arguments passed", function() {
          function mustThrow() {
            dll.insertAt();
          }
          assert.throws(mustThrow, Error);
        });

        it("throw error if there more then two argument passed", function() {
          function mustThrow() {
            dll.insert(1, 2, 3)
          }
          assert.throws(dll.remove, Error);
        });

        it("throw error if data equal to null", function() {
          function mustThrow() {
            dll.insertAt(null, 1);
          }
          assert.throws(mustThrow, Error);
        });

        it("throw error if data equal to undefined", function() {
          function mustThrow() {
            dll.insertAt(undefined, 1);
          }
          assert.throws(mustThrow, Error);
        });

        it("throw error if index not number", function() {
          function mustThrow() {
            dll.insertAt({}, "a");
          }
          assert.throws(mustThrow, Error);
        });

        it("index can be lower than 0", function() {
          function mustThrow() {
            dll.insertAt({}, -1);
          }
          assert.doesNotThrow(mustThrow, Error);
        });
      });

      describe("Actions", function() {

        it("return new legth", function() {
          const dll = new DoublyLinkedList();
          dll.add(1);
          dll.add(2);
          assert.equal(dll.insertAt("new", 1), 3);
        });

        it("index >= length -> insert as last element", function() {
          const dll = new DoublyLinkedList();
          dll.add(1);
          dll.add(2);
          dll.insertAt("new", 5);

          assert.equal(dll.findByIndex(0).data, 2);
          assert.equal(dll.findByIndex(1).data, 1);
          assert.equal(dll.findByIndex(2).data, "new");
        });

        it("|index < 0| >= length -> insert as first element", function() {
          const dll = new DoublyLinkedList();
          dll.add(1);
          dll.add(2);
          dll.insertAt("new", -5);

          assert.equal(dll.findByIndex(0).data, "new");
          assert.equal(dll.findByIndex(1).data, 2);
          assert.equal(dll.findByIndex(2).data, 1);
        });

        it("index > 0 -> insert from start", function() {
          const dll = new DoublyLinkedList();
          dll.add(1);
          dll.add(2);
          dll.insertAt("Node #1", 0);
          dll.insertAt("Node #2", 3);

          assert.equal(dll.findByIndex(0).data, "Node #1");
          assert.equal(dll.findByIndex(1).data, 2);
          assert.equal(dll.findByIndex(2).data, 1);
          assert.equal(dll.findByIndex(3).data, "Node #2");
        });

        it("index < 0 -> insert from end", function() {
          const dll = new DoublyLinkedList();
          dll.add(1);
          dll.add(2);
          dll.insertAt("Node #1", 0);
          dll.insertAt("Node #2", 3);
          dll.insertAt("Node #3", -2);

          assert.equal(dll.findByIndex(0).data, "Node #1");
          assert.equal(dll.findByIndex(1).data, 2);
          assert.equal(dll.findByIndex(2).data, "Node #3");
          assert.equal(dll.findByIndex(3).data, 1);
          assert.equal(dll.findByIndex(4).data, "Node #2");
        });
      });
    });

    describe("findByIndex(index) - find node by index", function () {
      describe("Errors", function() {
        const dll = new DoublyLinkedList();

        it("throw error if there no arguments passed", function() {
          function mustThrow() {
            dll.findByIndex();
          }
          assert.throws(mustThrow, Error);
        });

        it("throw error if there more then one argument passed", function() {
          function mustThrow() {
            dll.findByIndex(1, 2)
          }
          assert.throws(mustThrow, Error);
        });

        it("throw error if index not number", function() {
          function mustThrow() {
            dll.findByIndex({}, "a");
          }
          assert.throws(mustThrow, Error);
        });

        it("throw error if index lower than 0", function() {
          function mustThrow() {
            dll.findByIndex({}, -1);
          }
          assert.throws(mustThrow, Error);
        });
      });

      describe("Actions", function() {
        const dll = new DoublyLinkedList();
        dll.add("Node #1");
        dll.add("Node #2");
        dll.add("Node #3");

        it("return DoublyNode if it found", function() {
          const node = dll.findByIndex(2);
          assert.instanceOf(node, DoublyNode);
          assert.equal(node.data, "Node #1");
        });

        it("return null if it not found", function() {
          const node = dll.findByIndex(4);
          assert.isNull(node);
        });
      });
    });
  });
});