require 'spec_helper'

describe Relationship do
  let(:follower) { FactoryGirl.create(:user) }
  let(:followed) { FactoryGirl.create(:user) }
  let(:relationship) { follower.relationships.build(followed_id: followed.id) }

  subject { relationship }

  it {should be_valid}

  describe "accessible attributes" do
    it "should not allow access to the follower_id" do
      expect do
        Relationship.new(follower_id: "1")
      end.should raise_error(ActiveModel::MassAssignmentSecurity::Error)
    end
  end
  describe "folloer methods" do
    it {should respond_to(:follower)}
    it {should respond_to(:followed)}

    its(:follower) { should == follower }
    its(:followed) { should == followed }
    
  end

  describe "when followed id is not present" do
    before {relationship.followed_id = nil}
    it{ should_not be_valid}
  end

  describe "when follower id is not present" do
    before {relationship.follower_id = nil}
    it{ should_not be_valid}
  end
end
