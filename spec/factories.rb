FactoryGirl.define do |variable|
	factory :user do
    sequence(:name){|n| "Person #{n}"}
    sequence(:email){|n| "email_#{n}@example.com"}
   	password "foobar"
		password_confirmation "foobar"
  end  
  
  factory :admin do
      admin true
  end

  factory :micropost do
      content "Lorem ipsum"
      user
  end
	
end