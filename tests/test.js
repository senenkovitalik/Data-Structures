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
    describe("add new Node to the beginning", function () {
      const dll = new DoublyLinkedList();

      describe("Errors", function() {
        it("addNode() must throw error if there more than one argument", function() {
          function mustThrow() {
            dll.addNode(1, 2)
          }
          assert.throws(mustThrow, Error);
        });

        it("addNode() must throw error if argument type equal to null", function() {
          function mustThrow() {
            dll.addNode(null)
          }
          assert.throws(dll.addNode, Error);
        });

        it("addNode() must throw error if argument type equal to undefined", function() {
          function mustThrow() {
            dll.addNode(undefined)
          }
          assert.throws(dll.addNode, Error);
        });
      });

      describe("Actions", function() {
        it("after adding node list length increase by 1", function() {
          dll.addNode({});
          assert.equal(dll.length, 1);
        });
      })
    });

    describe("remove Node from the beginning", function () {
      const dll = new DoublyLinkedList();

      describe("Errors", function() {
        it("removeNode() must throw error if there any arguments passed", function() {
          function mustThrow() {
            dll.removeNode(1, 2)
          }
          assert.throws(mustThrow, Error);
        });

        it("removeNode() must throw error if list is empty", function() {
          function mustThrow() {
            dll.removeNode()
          }
          assert.throws(dll.removeNode, Error);
        });
      });

      describe("Actions", function() {
        it("list length should decrease by one", function() {
          dll.addNode({});
          dll.removeNode();
          assert.equal(dll.length, 0);

          dll.addNode({});
          dll.addNode({});
          dll.removeNode();
          assert.equal(dll.length, 1);
        });
      });
    });

    describe("insert new Node", function () {
      const dll = new DoublyLinkedList();
 
      describe("Errors", function() {
        it("insertBefore() must throw error if there no arguments passed", function() {
          function mustThrow() {
            dll.insertNode()
          }
          assert.throws(mustThrow, Error);
        });

        it("insertBefore() must throw error if there more then two argument passed", function() {
          function mustThrow() {
            dll.insert(1, 2, 3)
          }
          assert.throws(dll.removeNode, Error);
        });

        it("insertBefore() must throw error if data equal to null", function() {
          function mustThrow() {
            dll.insertNode(null, 1);
          }
          assert.throws(mustThrow, Error);
        });

        it("insertBefore() must throw error if data equal to undefined", function() {
          function mustThrow() {
            dll.insertNode(undefined, 1);
          }
          assert.throws(mustThrow, Error);
        });

        it("insertBefore() must throw error if index not number", function() {
          function mustThrow() {
            dll.insertNode({}, "a");
          }
          assert.throws(mustThrow, Error);
        });

        it("insertBefore() must throw error if index lower than 0", function() {
          function mustThrow() {
            dll.insertNode({}, -1);
          }
          assert.throws(mustThrow, Error);
        });
      });

      describe("Actions", function() {
        it("after insert list length will increase by one", function() {
          dll.addNode(1);
          dll.addNode(2);
          dll.insertBefore(3, 1);
          assert.equal(dll.length, 3);
        });
      });
    });

    describe("find node by index", function () {
      const dll = new DoublyLinkedList();
 
      describe("Errors", function() {
        it("findNode() must throw error if there no arguments passed", function() {
          function mustThrow() {
            dll.findByIndex();
          }
          assert.throws(mustThrow, Error);
        });

        it("findNode() must throw error if there more then one argument passed", function() {
          function mustThrow() {
            dll.findByIndex(1, 2)
          }
          assert.throws(mustThrow, Error);
        });

        it("findNode() must throw error if index not number", function() {
          function mustThrow() {
            dll.findByIndex({}, "a");
          }
          assert.throws(mustThrow, Error);
        });

        it("findNode() must throw error if index lower than 0", function() {
          function mustThrow() {
            dll.findByIndex({}, -1);
          }
          assert.throws(mustThrow, Error);
        });
      });

      describe("Actions", function() {

        dll.addNode("Node #1");

        it("return DoublyNode if it found", function() {
          const node = dll.findByIndex(0);
          assert.instanceOf(node, DoublyNode);
        });

        it("return null if it not found", function() {
          const node = dll.findByIndex(4);
          assert.isNull(node);
        });
      });
    });
  });
});