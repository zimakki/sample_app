class Micropost < ActiveRecord::Base
  attr_accessible :content
  belongs_to :user
  
  validates :user_id, presence: true
  validates :content, presence: true, length: {maximum: 140}

  default_scope order: 'microposts.created_at DESC'

  def self.from_users_follewed_by(user)
    following_user_ids = "SELECT followed_id FROM relationships
                          WHERE followed_id = :user_id"
    where("user_id IN (#{following_user_ids}) OR user_id = :user_id", 
          user_id: user.id)    

    # working!
    # following_ids = user.followed_users.map(&:id).join(', ')
    # where("user_id IN (?) OR user_id = ?", following_ids, user.id)    

    # working!
    # following_ids = user.followed_user_ids
    # where("user_id IN (?) OR user_id = ?", following_ids, user.id)    

    # working!
    # where("user_id IN (?) OR user_id = ?", user.followed_user_ids, user.id)    

    # working
    # following_ids = user.followed_user_ids
    # where("user_id IN (:following_ids) OR user_id = :user_id", 
    #   {
    #     following_ids: following_ids, 
    #     user_id: user.id})    

    # not working :(
    # following_user_ids = "SELECT followed_id FROM relationships
    #                       WHERE followed_id = :user_id"
    # where("user_id IN (#{following_user_ids}) OR user_id = :user_id", 
    #       user_id: user.id)    

  end
end
