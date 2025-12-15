import '@testing-library/jest-dom/extend-expect';
import { cleanup, render, screen } from '@testing-library/react';
import ResultBox from './ResultBox';
  describe('Component ResultBox', () => {
    it('should render without crashing', () => {
      render(<ResultBox from="PLN" to="USD" amount={100} />);
    });
    it('should render proper info about conversion when PLN -> USD',()=>{
      const testCases = [
        { amount: 100.00, output:'28.57'},
        { amount: 20.00,  output:'5.71'},
        { amount: 200.00, output:'57.14'},
        { amount: 345.00, output:'98.57'},
      ];
      for(const testObj of testCases) {
        render(<ResultBox from="PLN" to="USD" amount={testObj.amount} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent(`PLN ${testObj.amount.toFixed(2)} = $${testObj.output}`);
        cleanup()
      };
    });

    it('should render proper info about conversion when USD -> PLN',()=>{
      const testCases = [
        { amount: 100.00, output:'350.00'},
        { amount: 20.00,  output:'70.00'},
        { amount: 200.00, output:'700.00'},
        { amount: 345.00, output:'1,207.50'},
      ];
      for(const testObj of testCases) {
        render(<ResultBox from="USD" to="PLN" amount={testObj.amount} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent(`$${testObj.amount.toFixed(2)} = PLN ${testObj.output}`);
        cleanup()
      };
    });

    it('should render proper info about conversion when PLN -> PLN',()=>{
      const testCases = [
        { amount: 100.00, output:'100.00'},
        { amount: 20.00,  output:'20.00'},
        { amount: 200.00, output:'200.00'},
        { amount: 345.00, output:'345.00'},
      ];
      for(const testObj of testCases) {
        render(<ResultBox from="PLN" to="PLN" amount={testObj.amount} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent(`PLN ${testObj.amount.toFixed(2)} = PLN ${testObj.output}`);
        cleanup()
      };
    });

    it('should render proper info about conversion when USD -> USD',()=>{
      const testCases = [
        { amount: 100.00, output:'100.00'},
        { amount: 20.00,  output:'20.00'},
        { amount: 200.00, output:'200.00'},
        { amount: 345.00, output:'345.00'},
      ];
      for(const testObj of testCases) {
        render(<ResultBox from="USD" to="USD" amount={testObj.amount} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent(`$${testObj.amount.toFixed(2)} = $${testObj.output}`);
        cleanup()
      };
    });

    it('should render Error about conversion negativ amount',()=>{
      const testCases = [
        { amount: -100.00, output:'Wrong value...'},
        { amount: -20.00,  output:'Wrong value...'},
        { amount: -200.00, output:'Wrong value...'},
        { amount: -345.00, output:'Wrong value...'},
      ];
      for(const testObj of testCases) {
        render(<ResultBox from="USD" to="PLN" amount={testObj.amount} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent(`-$${Math.abs(testObj.amount).toFixed(2)} = ${testObj.output}`);
        cleanup()
      };
    });
});