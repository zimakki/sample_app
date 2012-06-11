require 'spec_helper'

describe "Micropost Pages" do
  subject {page}
  let(:user) { FactoryGirl.create(:user)  }
  before { sign_in user}

  describe "Micropost creation" do
    before {visit root_path}

    describe "with invalid informaiton" do
      it "should not create a Micropost" do
        expect {click_button "Post"}.not_to change(Micropost, :count)
      end  

      describe "error messages" do
        before{ click_button "Post"}
        it {should have_content('error')}
      end
    end
  end

  describe "micropost destruction" do
    before { FactoryGirl.create(:micropost, user: user)}

    describe "as correct user" do
      before {visit root_path}
      it "should delete a micropost" do
        # save_and_open_page
        expect {click_link "delete"}.should change(Micropost, :count).by(-1)
      end  
    end
  end
end
