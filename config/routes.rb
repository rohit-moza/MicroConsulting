Rails.application.routes.draw do

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  scope '/api' do
    resources :answers
    resources :questionanswers
    resources :questions do
      collection do
        get 'my_questions'
      end
    end
    resources :subjects
    resources :users do
      collection do
        get 'confirm'
        post 'login'
      end
    end
  end
end
