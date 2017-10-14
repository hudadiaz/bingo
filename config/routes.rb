Rails.application.routes.draw do
  root 'root#index'

  get 'game/new', to: 'game#new', as: :new_game
  get 'game/find', to: 'game#find', as: :find_game
  get 'game/:id', to: 'game#show', as: :game

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
