describe 'Mock'
    before_each
        mock = new Mock(Person, new ExpectationMatcher());
    end

    describe 'Mocking'
        it 'should replace all public methods on class'
            mock.hasOwnProperty('getName').should.be_true
            mock.hasOwnProperty('getAge').should.be_true
        end

        it 'should throw an error if expect is not called before the function is invoked'
            try {
                mock.getName().toReturn('bob');

                fail('An error should be thrown')
            }catch(e) {
                true.should.eql true
            }
        end

        it 'should return the value set by the expecation'
            mock.expects().getName().toReturn("bob");

            mock.getName().should.eql 'bob'
        end

        it 'should execute the stubbed function set by the expecation'
            mock.expects().getAge().toExecute(function() {
                return 73;
            });

            mock.getAge().should.eql 73
        end

        it 'should throw the exception set by the expecation'
            try {
                mock.expects().getName().toThrow(new Error("Expected error"));
                mock.getName();

                fail('An error should have been thrown')
            } catch(e) {
                true.should.eql true
            }
        end

        it 'returns values in the order they were set'
            mock.expects().getAge().toReturn(11).toReturn(12);

            mock.getAge().should.eql 11
            mock.getAge().should.eql 12
        end
    end

    describe 'Verification'
        it 'should ask the expectation matcher to perform strict verification'
            var verifyCalled = false;

            var expectationMatcherStub = {
                verify : function() {
                    verifyCalled = true;
                }
            };

            mock = new Mock(Person, expectationMatcherStub);

            mock.verifyStrict();

            verifyCalled.should.be_true
        end
    end
end