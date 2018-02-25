import React from "react";
import { mount, configure  } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LeafletMap from "./LeafletMap";

configure({ adapter: new Adapter() });

describe("LeafletMap", () => {

it('renders a map', () => {
	const wrapper = mount(<LeafletMap />);
	const divs = wrapper.find("Map");
	expect(divs.length).toBeGreaterThan(0);
	});
});
