FactoryGirl.define do |variable|
	factory :user do
		name "Michael Hartl"
		email "mhartl@example.com"
		password "foobar"
		password_confirmation "foobar"
	end
end